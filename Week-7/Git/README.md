# Git Configuration & Basics Lab - Walkthrough & Guide

This document outlines the objectives, steps completed, and remaining actions to finish the Git configuration, repository setup, `.gitignore`, branching/merging, conflict resolution, and remote sync labs.

---

## Objectives
* Familiarize with Git commands: `git init`, `git status`, `git add`, `git commit`, `git push`, and `git pull`.
* Setup Git configuration (User ID & Email ID).
* Integrate Notepad++ as the default Git editor.
* Initialize a local repository and add a file to the source code repository.
* Explain and implement `.gitignore` to prevent tracking unwanted files and folders.
* Construct a branch, make changes, diff branches, merge, and clean up.
* Explain branching/merging concepts, GitLab Branch & Merge Requests, and P4Merge integration.
* Explain how to resolve merge conflicts and perform conflict resolution.
* Explain how to clean up and push changes back to remote Git.

---

## Step 1: Git Configuration Setup (Completed & Verified)

1. **Verify Git Installation**: 
   The system has Git installed. 
   * **Command executed**: `git --version`
   * **Output**: `git version 2.54.0.windows.1`

2. **Verify User Configuration**:
   The user configuration is already set globally on this machine:
   * **User Name**: `Dharani`
   * **User Email**: `dharaniganga85@gmail.com`
   
   If you ever need to change or re-set these configurations, you can run:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

3. **List Configurations**:
   Verify global configurations by running:
   ```bash
   git config --list
   ```

---

## Step 2: Integrate Notepad++ to Git (User Action Required)

During checks, it was determined that **Notepad++ is not currently installed** on this machine in standard paths (`C:\Program Files\Notepad++` or `C:\Program Files (x86)\Notepad++`).

### Action Steps:
1. **Download & Install Notepad++**:
   Download and install Notepad++ from the [official website](https://notepad-plus-plus.org/).

2. **Add Notepad++ to System Environment Variables**:
   * Open the Start Menu, search for **"Edit the system environment variables"**, and select it.
   * In the System Properties window, click on the **Environment Variables...** button.
   * Under **User variables**, select the `Path` variable and click **Edit...**.
   * Click **New** and paste the installation path of Notepad++ (usually `C:\Program Files\Notepad++`).
   * Click **OK** to save and close all dialogs.
   * Open a new Git Bash or Terminal window and run `notepad++` to verify it opens.

3. **Configure Notepad++ as default editor in Git**:
   Once Notepad++ is installed and added to the PATH, run the following command to configure Git to use it as the default editor:
   ```bash
   git config --global core.editor "'C:\Program Files\Notepad++\notepad++.exe' -multiInst -notabbar -nosession -noPlugin"
   ```
   
4. **Verify configuration**:
   To verify that Notepad++ is set as the default editor, run:
   ```bash
   git config --global -e
   ```
   This command will open the global Git configuration file inside Notepad++.

---

## Step 3: Add File to Source Code Repository (Locally Completed)

We have successfully performed the local Git operations inside the `GitDemo` directory:

1. **Initialize Git Repository**:
   * **Command executed**: `git init GitDemo` (initialized at `Week-7/Git/GitDemo`)
   * **Verification**: `.git` hidden folder is successfully initialized.

2. **Create and Verify `welcome.txt`**:
   * Created file `welcome.txt` with content: `"Welcome to Git"`
   * Verified existence and contents.

3. **Stage and Commit**:
   * **Staged**: Ran `git add welcome.txt`
   * **Committed**: Ran `git commit -m "Initial commit with welcome.txt"` to finalize the commit.
   * **Status**: Verified via `git status`, working tree is now clean.

---

## Step 4: Connecting to GitLab Remote (User Action Required)

Since remote repositories require personal credentials/accounts, you should perform these final steps to link the local repository to GitLab:

1. **Create Remote Repository**:
   * Sign up or log in to your personal [GitLab](https://gitlab.com) account (do not use Cognizant corporate credentials).
   * Create a new blank project named **GitDemo**.
   * Copy the repository URL (e.g., `https://gitlab.com/your-username/GitDemo.git`).

2. **Link Local Repository to Remote**:
   Open Git Bash inside the `Week-7/Git/GitDemo` folder and run:
   ```bash
   git remote add origin <your-gitlab-repository-url>
   ```

3. **Pull Remote Changes (if any)**:
   ```bash
   git pull origin master
   ```

4. **Push Local Commits to Remote**:
   ```bash
   git push -u origin master
   ```

---

## Step 5: Ignore Unwanted Files using `.gitignore` (Completed & Verified)

### What is `.gitignore`?
A `.gitignore` file specifies intentionally untracked files and folders that Git should ignore. Files already tracked by Git are not affected. 

### Implementation Steps Completed:

1. **Created `.gitignore`**:
   Added a [.gitignore](file:///c:/Users/dhara/OneDrive/Desktop/projects/DN-5.0%20java%20exercises/Week-7/Git/GitDemo/.gitignore) file to ignore `*.log` files and the `log/` folder.

2. **Created Ignored Files & Directories**:
   * Created [error.log](file:///c:/Users/dhara/OneDrive/Desktop/projects/DN-5.0%20java%20exercises/Week-7/Git/GitDemo/error.log)
   * Created folder `log/` with [trace.txt](file:///c:/Users/dhara/OneDrive/Desktop/projects/DN-5.0%20java%20exercises/Week-7/Git/GitDemo/log/trace.txt)

3. **Verified Ignored Status**:
   * Ran `git status --ignored` to confirm they are registered as ignored.

4. **Committed `.gitignore`**:
   * Committed `.gitignore` (`git commit -m "Add .gitignore file"`). Working tree is clean.

---

## Step 6: Branching and Merging (Completed & Verified)

### Core Concepts:
* **Branching**: Creating a parallel line of development to work on features or bug fixes independently of the stable trunk/master.
* **Merging**: Combining changes from a feature branch back into the main trunk/master.

### Completed Local Operations:

1. **Create & List Branches**:
   * Created new branch `GitNewBranch` (`git branch GitNewBranch`).
   * Listed branches using `git branch -a`. Current branch was marked with an asterisk (`* master`).

2. **Switch Branches & Commit Changes**:
   * Checked out `GitNewBranch` (`git checkout GitNewBranch`).
   * Created [feature.txt](file:///c:/Users/dhara/OneDrive/Desktop/projects/DN-5.0%20java%20exercises/Week-7/Git/GitDemo/feature.txt) with sample contents.
   * Staged and committed `feature.txt` (`git commit -m "Add feature.txt on GitNewBranch"`).
   * Verified status (`git status`) to ensure the branch working tree was clean.

3. **Switch to Master & Diff**:
   * Switched back to `master` branch (`git checkout master`).
   * Displayed the command-line diff between `master` and the feature branch:
     ```bash
     git diff master GitNewBranch
     ```

4. **Visual Diff with P4Merge (User Action Required)**:
   P4Merge is a visual diff tool. Since it is a GUI-based desktop application, it is not installed on this server environment.
   * **To setup P4Merge on Windows**:
     1. Download and install **P4Merge** from the Perforce website.
     2. Add the tool to Git config by running:
        ```bash
        git config --global diff.tool p4merge
        git config --global difftool.p4merge.path "C:/Program Files/Perforce/p4merge.exe"
        git config --global merge.tool p4merge
        git config --global mergetool.p4merge.path "C:/Program Files/Perforce/p4merge.exe"
        ```
     3. Run the visual diff tool command:
        ```bash
        git difftool master GitNewBranch
        ```

5. **Merge Branches**:
   * Merged `GitNewBranch` into `master` (`git merge GitNewBranch`). Git executed a fast-forward merge.

6. **Log Verification**:
   * Observed the commit tree history with:
     ```bash
     git log --oneline --graph --decorate
     ```
     **Output**:
     ```text
     * f95d470 (HEAD -> master) Add feature.txt on GitNewBranch
     * 24b986f Add .gitignore file
     * 0cce138 Initial commit with welcome.txt
     ```

7. **Clean up Branch**:
   * Deleted `GitNewBranch` (`git branch -d GitNewBranch`).
   * Verified with `git status` that the working tree is clean and only `master` remains.

---

## Step 7: Resolve Merge Conflicts (Completed & Verified)

### How Merge Conflicts Occur
A merge conflict occurs when two branches make modifications to the same line(s) in a file, or if one branch deletes a file while the other branch modifies it. Git cannot automatically decide which version to keep, so it pauses the merge process and inserts **conflict markup markers** into the file.

### Completed Local Operations:

1. **Created Branch `GitWork` & Added `hello.xml`**:
   * Switched to a new branch: `git checkout -b GitWork`
   * Created [hello.xml](file:///c:/Users/dhara/OneDrive/Desktop/projects/DN-5.0%20java%20exercises/Week-7/Git/GitDemo/hello.xml) with a branch-specific message.
   * Staged and committed the changes on the `GitWork` branch.

2. **Diverged `master` Branch**:
   * Switched back to `master`: `git checkout master`
   * Created [hello.xml](file:///c:/Users/dhara/OneDrive/Desktop/projects/DN-5.0%20java%20exercises/Week-7/Git/GitDemo/hello.xml) with a master-specific message (different from `GitWork`).
   * Staged and committed the changes on the `master` branch.

3. **Observed Diverged Logs**:
   * Checked the log containing all branches: `git log --oneline --graph --decorate --all`
   * **Result**:
     ```text
     * 375cdbb (HEAD -> master) Add hello.xml on master
     | * 9d11fed (GitWork) Add hello.xml on GitWork
     |/  
     * f95d470 Add feature.txt on GitNewBranch
     ```

4. **Triggered Merge Conflict**:
   * Ran the merge command on `master`: `git merge GitWork`
   * **Result**:
     ```text
     CONFLICT (add/add): Merge conflict in hello.xml
     Automatic merge failed; fix conflicts and then commit the result.
     ```

5. **Observed Conflict Markup**:
   * Viewed the conflict markers inside `hello.xml`:
     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <hello>
     <<<<<<< HEAD
         <message>Hello from master branch</message>
     =======
         <message>Hello from GitWork branch</message>
     >>>>>>> GitWork
     </hello>
     ```

6. **Resolved the Conflict**:
   * Edited [hello.xml](file:///c:/Users/dhara/OneDrive/Desktop/projects/DN-5.0%20java%20exercises/Week-7/Git/GitDemo/hello.xml) to combine the modifications:
     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <hello>
         <message>Hello from master branch</message>
         <message>Hello from GitWork branch</message>
     </hello>
     ```
   * Staged the resolved file: `git add hello.xml`
   * Finalized the merge commit: `git commit -m "Resolve merge conflict in hello.xml by combining messages"`

7. **Configured backup ignores**:
   * Added `*.orig` and `*.bak` to [.gitignore](file:///c:/Users/dhara/OneDrive/Desktop/projects/DN-5.0%20java%20exercises/Week-7/Git/GitDemo/.gitignore) to ensure backup files generated by 3-way merge tools are ignored.
   * Staged and committed `.gitignore`.

8. **Cleaned up Branch**:
   * Deleted the feature branch: `git branch -d GitWork`
   * Ran final history check: `git log --oneline --graph --decorate`
   * **Resulting Tree**:
     ```text
     * c288c80 (HEAD -> master) Ignore merge backup files (*.orig, *.bak)
     *   0492c11 Resolve merge conflict in hello.xml by combining messages
     |\  
     | * 9d11fed Add hello.xml on GitWork
     * | 375cdbb Add hello.xml on master
     |/  
     * f95d470 Add feature.txt on GitNewBranch
     ```

---

## Step 8: Clean Up & Push to Remote (User Action Required)

All local files are committed, merged, and cleaned up. To complete the sync back to GitLab:

1. **Verify master state is clean**:
   Ensure there are no uncommitted changes:
   ```bash
   git status
   ```

2. **List available branches**:
   Ensure only `master` is active locally:
   ```bash
   git branch -a
   ```

3. **Link your Remote GitLab Repository (if not done yet)**:
   Add the remote repository origin to Git:
   ```bash
   git remote add origin <your-gitlab-repository-url>
   ```

4. **Pull Remote Changes**:
   Sync with any changes on the remote branch to avoid out-of-sync conflicts:
   ```bash
   git pull origin master
   ```

5. **Push Changes to Remote GitLab**:
   Upload all local commits (`welcome.txt`, `.gitignore` configuration, conflict-resolved `hello.xml`, and merge histories) to your remote GitLab repository:
   ```bash
   git push -u origin master
   ```

6. **Verify on GitLab**:
   Go to your project URL on GitLab to check that your files (`welcome.txt`, `hello.xml`, `feature.txt`, `.gitignore`) and your complete commit tree history are visible under the files and commits view.

---

## GitLab Branch and Merge Requests (Guides)

### How to Create a Remote Branch in GitLab
In GitLab, you can create branches via the web UI or via command line.
* **Via GitLab Web UI**:
  1. Navigate to your project repository.
  2. Select **Code -> Branches** from the sidebar.
  3. Click **New Branch**, specify the name, choose the source branch, and click **Create branch**.
* **Via Command Line**:
  ```bash
  git checkout -b GitNewBranch
  git push -u origin GitNewBranch
  ```

### How to Create a Merge Request (MR) in GitLab
A Merge Request (MR) in GitLab is a proposal to merge changes from a feature branch into a target branch (like `master` or `main`), allowing team review and CI/CD validation.
* **Steps**:
  1. Once you push your branch to GitLab, open your project repository homepage.
  2. Click the **"Create merge request"** button on the banner that appears.
  3. Choose the **Source branch** (e.g. `GitNewBranch`) and the **Target branch** (e.g. `master`).
  4. Write a title and description, assign reviewers, and select any merge options (like squash commits or delete source branch after merge).
  5. Click **Submit merge request**.
  6. Once reviews are complete, click **Merge** inside the MR page to integrate the changes.
