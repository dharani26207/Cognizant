import os
import json
import uuid
import secrets
import shutil
import subprocess
from datetime import datetime

def log(msg):
    print(f"[*] {msg}")

def log_success(msg):
    print(f"[+] {msg}")

def log_warning(msg):
    print(f"[!] {msg}")

def log_error(msg):
    print(f"[-] {msg}")

# 1. Paths
user_home = os.path.expanduser("~")
appdata_roaming = os.environ.get("APPDATA")
appdata_local = os.environ.get("LOCALAPPDATA")

cursor_appdata = os.path.join(appdata_roaming, "Cursor")
cursor_install_dir = os.path.join(appdata_local, "Programs", "cursor")

# Fallbacks for installation dir
candidates = [
    cursor_install_dir,
    os.path.join(os.environ.get("ProgramFiles", "C:\\Program Files"), "Cursor"),
    os.path.join(os.environ.get("ProgramFiles(x86)", "C:\\Program Files (x86)"), "Cursor"),
]

actual_install_dir = None
for c in candidates:
    if os.path.exists(os.path.join(c, "Cursor.exe")):
        actual_install_dir = c
        break

if not actual_install_dir:
    log_error("Could not locate Cursor.exe installation directory.")
    log("Please make sure Cursor is installed.")
    # We will assume cursor_install_dir is the default if not found
    actual_install_dir = cursor_install_dir
else:
    log_success(f"Located Cursor installation directory: {actual_install_dir}")

# File paths
storage_json_path = os.path.join(cursor_appdata, "User", "globalStorage", "storage.json")
machineid_path = os.path.join(cursor_appdata, "machineid")
updaterid_path = os.path.join(cursor_appdata, ".updaterId")
main_js_path = os.path.join(actual_install_dir, "resources", "app", "out", "main.js")
shared_process_main_js_path = os.path.join(
    actual_install_dir, "resources", "app", "out", "vs", "code", "electron-utility", "sharedProcess", "sharedProcessMain.js"
)

# 2. Terminate Cursor Processes
def terminate_cursor_processes():
    log("Checking for running Cursor processes...")
    try:
        # Get list of running tasks
        output = subprocess.check_output("tasklist", shell=True).decode('utf-8', errors='ignore')
        if "cursor" in output.lower():
            log("Found running Cursor processes. Terminating...")
            subprocess.run("taskkill /f /im cursor.exe", shell=True)
            subprocess.run("taskkill /f /im Cursor.exe", shell=True)
            log_success("Cursor processes terminated.")
        else:
            log("No running Cursor processes found.")
    except Exception as e:
        log_warning(f"Error checking/terminating processes: {e}")

# 3. Generate IDs
def generate_ids():
    machine_id = secrets.token_hex(32) # 64 chars
    mac_machine_id = secrets.token_hex(32)
    dev_device_id = str(uuid.uuid4())
    sqm_id = "{" + str(uuid.uuid4()).upper() + "}"
    machine_guid = str(uuid.uuid4())
    mac_address = ":".join(f"{secrets.randbelow(256):02X}" for _ in range(6))
    session_id = str(uuid.uuid4())
    first_session_date = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"
    
    return {
        "machineId": machine_id,
        "macMachineId": mac_machine_id,
        "devDeviceId": dev_device_id,
        "sqmId": sqm_id,
        "machineGuid": machine_guid,
        "macAddress": mac_address,
        "sessionId": session_id,
        "firstSessionDate": first_session_date,
        "createdAt": first_session_date
    }

# 4. Deploy Hook Script
def deploy_hook_script():
    src_hook = r"C:\Users\dhara\OneDrive\Desktop\projects\DN-5.0 java exercises\Week-6\Angular\cursor_hook_raw.js"
    dest_hook = os.path.join(user_home, ".cursor_hook.js")
    
    if not os.path.exists(src_hook):
        log_error(f"Source hook script not found: {src_hook}")
        return False
        
    try:
        with open(src_hook, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Strip header if present
        idx = content.find("/**")
        if idx != -1:
            content = content[idx:]
            
        with open(dest_hook, "w", encoding="utf-8") as f:
            f.write(content)
            
        log_success(f"Deployed hook script to: {dest_hook}")
        return True
    except Exception as e:
        log_error(f"Failed to deploy hook script: {e}")
        return False

# 5. Save IDs JSON
def save_ids_json(ids):
    ids_path = os.path.join(user_home, ".cursor_ids.json")
    try:
        with open(ids_path, "w", encoding="utf-8") as f:
            json.dump(ids, f, indent=2)
        log_success(f"Saved ID configuration to: {ids_path}")
    except Exception as e:
        log_error(f"Failed to save ID configuration: {e}")

# 6. Update storage.json and machineid files
def update_configs(ids):
    # Update storage.json
    if not os.path.exists(storage_json_path):
        log_warning(f"storage.json not found at {storage_json_path}. Creating a dummy one.")
        os.makedirs(os.path.dirname(storage_json_path), exist_ok=True)
        data = {}
    else:
        # Remove read-only attribute if set
        if os.path.exists(storage_json_path):
            os.chmod(storage_json_path, 0o666)
            
        try:
            with open(storage_json_path, "r", encoding="utf-8") as f:
                data = json.load(f)
        except Exception as e:
            log_warning(f"Error reading storage.json: {e}. Starting fresh.")
            data = {}
            
    # Backup
    backup_path = storage_json_path + ".bak"
    try:
        if os.path.exists(storage_json_path):
            shutil.copy(storage_json_path, backup_path)
            log(f"Backed up storage.json to {backup_path}")
    except Exception as e:
        log_warning(f"Failed to backup storage.json: {e}")

    data["telemetry.machineId"] = ids["machineId"]
    data["telemetry.macMachineId"] = ids["macMachineId"]
    data["telemetry.devDeviceId"] = ids["devDeviceId"]
    data["telemetry.sqmId"] = ids["sqmId"]
    
    service_machine_id = str(uuid.uuid4())
    data["storage.serviceMachineId"] = service_machine_id
    data["telemetry.firstSessionDate"] = ids["firstSessionDate"]

    try:
        with open(storage_json_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4)
        log_success("Updated storage.json with new identifiers.")
        
        # Set storage.json to read-only to prevent Cursor from overwriting it
        os.chmod(storage_json_path, 0o444)
        log("[+] Set storage.json to read-only.")
    except Exception as e:
        log_error(f"Failed to write storage.json: {e}")

    # machineid file
    try:
        if os.path.exists(machineid_path):
            os.chmod(machineid_path, 0o666)
        with open(machineid_path, "w", encoding="utf-8") as f:
            f.write(service_machine_id)
        os.chmod(machineid_path, 0o444)
        log_success("Updated machineid file and set to read-only.")
    except Exception as e:
        log_warning(f"Failed to update machineid file: {e}")

    # .updaterId file
    try:
        if os.path.exists(updaterid_path):
            os.chmod(updaterid_path, 0o666)
        with open(updaterid_path, "w", encoding="utf-8") as f:
            f.write(str(uuid.uuid4()))
        os.chmod(updaterid_path, 0o444)
        log_success("Updated .updaterId file and set to read-only.")
    except Exception as e:
        log_warning(f"Failed to update .updaterId file: {e}")

# 7. Inject Loader into JS files
def inject_loader(js_path):
    if not os.path.exists(js_path):
        log_warning(f"JS file not found: {js_path}")
        return
        
    log(f"Processing JS file: {js_path}")
    
    # Backup
    orig_backup = js_path + ".original"
    if not os.path.exists(orig_backup):
        shutil.copy(js_path, orig_backup)
        log_success(f"Created original backup: {orig_backup}")
    else:
        # Restore clean backup to ensure we don't double inject
        shutil.copy(orig_backup, js_path)
        log(f"Restored clean file from backup.")

    loader_code = """
// ========== Cursor Hook Loader 开始 ==========
;(async function(){/*__cursor_patched__*/
'use strict';
if (globalThis.__cursor_hook_loaded__) return;
globalThis.__cursor_hook_loaded__ = true;

try {
    var fsMod = await import('fs');
    var pathMod = await import('path');
    var osMod = await import('os');
    var urlMod = await import('url');

    var fs = fsMod && (fsMod.default || fsMod);
    var path = pathMod && (pathMod.default || pathMod);
    var os = osMod && (osMod.default || osMod);
    var url = urlMod && (urlMod.default || urlMod);

    if (fs && path && os && url && typeof url.pathToFileURL === 'function') {
        var hookPath = path.join(os.homedir(), '.cursor_hook.js');
        if (typeof fs.existsSync === 'function' && fs.existsSync(hookPath)) {
            await import(url.pathToFileURL(hookPath).href);
        }
    }
} catch (e) {
    // Silent fail
}
})();
// ========== Cursor Hook Loader 结束 ==========
"""

    try:
        with open(js_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        if "__cursor_patched__" in content:
            log_warning(f"File {js_path} is already patched.")
            return

        # Try to inject after copyright comment
        import re
        match = re.search(r'(\*/\s*\n)', content)
        if match:
            pos = match.end()
            content = content[:pos] + loader_code + content[pos:]
            log_success("Injected loader after copyright comment.")
        else:
            content = loader_code + content
            log_success("Injected loader at the beginning of the file.")
            
        with open(js_path, "w", encoding="utf-8") as f:
            f.write(content)
        log_success(f"Successfully patched: {js_path}")
    except Exception as e:
        log_error(f"Failed to patch {js_path}: {e}")

# 8. Disable Auto-Updates
def disable_updates():
    log("Disabling auto-updates...")
    
    # update-config.json in AppData
    appdata_update_config = os.path.join(cursor_appdata, "update-config.json")
    try:
        with open(appdata_update_config, "w", encoding="utf-8") as f:
            json.dump({"autoCheck": False, "autoDownload": False}, f)
        log_success("Disabled auto-update config in AppData.")
    except Exception as e:
        log_warning(f"Failed to disable auto-update in AppData: {e}")
        
    # settings.json update.mode
    settings_json_path = os.path.join(cursor_appdata, "User", "settings.json")
    try:
        if os.path.exists(settings_json_path):
            with open(settings_json_path, "r", encoding="utf-8") as f:
                settings = json.load(f)
        else:
            settings = {}
        settings["update.mode"] = "none"
        with open(settings_json_path, "w", encoding="utf-8") as f:
            json.dump(settings, f, indent=4)
        log_success("Set update.mode to 'none' in settings.json.")
    except Exception as e:
        log_warning(f"Failed to update settings.json: {e}")

    # Rename Update.exe and CursorUpdater.exe
    updater_files = [
        os.path.join(actual_install_dir, "Update.exe"),
        os.path.join(actual_install_dir, "CursorUpdater.exe"),
        os.path.join(appdata_local, "cursor-updater", "Update.exe"),
        os.path.join(appdata_local, "cursor-updater", "CursorUpdater.exe"),
    ]
    for u in updater_files:
        if os.path.exists(u):
            bak = u + ".bak"
            try:
                if os.path.exists(bak):
                    os.remove(bak)
                os.rename(u, bak)
                log_success(f"Renamed updater {u} to {bak}")
            except Exception as e:
                log_warning(f"Failed to rename {u}: {e}")

# 9. Main execution
def main():
    print("=" * 60)
    print("           Cursor Free Trial Reset Tool (Python)")
    print("=" * 60)
    
    terminate_cursor_processes()
    
    # Generate IDs
    ids = generate_ids()
    log("Generated new random machine identifiers.")
    
    # Deploy files
    if deploy_hook_script():
        save_ids_json(ids)
        update_configs(ids)
        inject_loader(main_js_path)
        inject_loader(shared_process_main_js_path)
        disable_updates()
        print("=" * 60)
        print("[+] SUCCESS: Cursor trial identifiers have been successfully reset.")
        print("[+] Please launch Cursor and log in with a new account.")
        print("=" * 60)
    else:
        log_error("Failed to deploy hook script. Aborting.")

if __name__ == "__main__":
    main()
