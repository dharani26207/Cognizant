SET SERVEROUTPUT ON;

/* ============================================================
   Exercise 1: Control Structures
   Assumed tables:
   Customers(CustomerID, Name, Age, Balance, IsVIP)
   Loans(LoanID, CustomerID, InterestRate, DueDate)
   ============================================================ */

/* Scenario 1:
   Apply a 1% discount to current loan interest rates for
   customers above 60 years old. */
BEGIN
    FOR customer_rec IN (
        SELECT CustomerID
        FROM Customers
        WHERE Age > 60
    ) LOOP
        UPDATE Loans
        SET InterestRate = InterestRate - 1
        WHERE CustomerID = customer_rec.CustomerID;
    END LOOP;

    COMMIT;
END;
/

/* Scenario 2:
   Mark customers as VIP when their balance is over $10,000.
   If your IsVIP column stores Y/N instead of TRUE/FALSE,
   replace 'TRUE' with 'Y'. */
BEGIN
    FOR customer_rec IN (
        SELECT CustomerID
        FROM Customers
        WHERE Balance > 10000
    ) LOOP
        UPDATE Customers
        SET IsVIP = 'TRUE'
        WHERE CustomerID = customer_rec.CustomerID;
    END LOOP;

    COMMIT;
END;
/

/* Scenario 3:
   Print reminders for customers whose loans are due within
   the next 30 days. */
BEGIN
    FOR loan_rec IN (
        SELECT c.CustomerID,
               c.Name,
               l.LoanID,
               l.DueDate
        FROM Customers c
        JOIN Loans l
            ON c.CustomerID = l.CustomerID
        WHERE l.DueDate BETWEEN SYSDATE AND SYSDATE + 30
    ) LOOP
        DBMS_OUTPUT.PUT_LINE(
            'Reminder: Customer ' || loan_rec.Name ||
            ' (ID: ' || loan_rec.CustomerID ||
            ') has loan ' || loan_rec.LoanID ||
            ' due on ' || TO_CHAR(loan_rec.DueDate, 'DD-MON-YYYY') || '.'
        );
    END LOOP;
END;
/

/* ============================================================
   Exercise 3: Stored Procedures
   Assumed tables:
   Accounts(AccountID, CustomerID, AccountType, Balance)
   Employees(EmployeeID, DepartmentID, Salary)
   ============================================================ */

/* Scenario 1:
   Process monthly interest for all savings accounts by applying
   1% interest to the current balance. */
CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest IS
BEGIN
    UPDATE Accounts
    SET Balance = Balance + (Balance * 0.01)
    WHERE AccountType = 'Savings';

    COMMIT;
END;
/

/* Scenario 2:
   Add a bonus percentage to employees in a given department. */
CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus (
    p_DepartmentID IN Employees.DepartmentID%TYPE,
    p_BonusPercent IN NUMBER
) IS
BEGIN
    UPDATE Employees
    SET Salary = Salary + (Salary * p_BonusPercent / 100)
    WHERE DepartmentID = p_DepartmentID;

    COMMIT;
END;
/

/* Scenario 3:
   Transfer funds between two accounts only if the source account
   has sufficient balance. */
CREATE OR REPLACE PROCEDURE TransferFunds (
    p_SourceAccountID IN Accounts.AccountID%TYPE,
    p_TargetAccountID IN Accounts.AccountID%TYPE,
    p_Amount          IN NUMBER
) IS
    v_SourceBalance Accounts.Balance%TYPE;
BEGIN
    SELECT Balance
    INTO v_SourceBalance
    FROM Accounts
    WHERE AccountID = p_SourceAccountID
    FOR UPDATE;

    IF v_SourceBalance >= p_Amount THEN
        UPDATE Accounts
        SET Balance = Balance - p_Amount
        WHERE AccountID = p_SourceAccountID;

        UPDATE Accounts
        SET Balance = Balance + p_Amount
        WHERE AccountID = p_TargetAccountID;

        COMMIT;
        DBMS_OUTPUT.PUT_LINE('Transfer completed successfully.');
    ELSE
        DBMS_OUTPUT.PUT_LINE('Transfer failed: insufficient balance.');
        ROLLBACK;
    END IF;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Transfer failed: account not found.');
        ROLLBACK;
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Transfer failed: ' || SQLERRM);
        ROLLBACK;
END;
/
