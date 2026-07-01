package com.example;

import org.junit.Before;
import org.junit.After;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 * Exercise 4: Arrange-Act-Assert (AAA) Pattern, Test Fixtures, Setup and Teardown Methods in JUnit.
 * Organizes tests using the AAA pattern and uses setup/teardown methods.
 */
public class CalculatorTest {

    // Test fixture: the System Under Test (SUT)
    private Calculator calculator;

    /**
     * Setup method - runs before each test case.
     * This prepares the test fixture (Arrange).
     */
    @Before
    public void setUp() {
        calculator = new Calculator();
        System.out.println("[SetUp] Initialized Calculator instance.");
    }

    /**
     * Teardown method - runs after each test case.
     * This cleans up the test fixture after the test executes.
     */
    @After
    public void tearDown() {
        calculator = null;
        System.out.println("[TearDown] Cleaned up Calculator instance.");
    }

    /**
     * Test case for addition, structured with the AAA pattern.
     */
    @Test
    public void testAdd() {
        // 1. Arrange: Prepare the input data and environment (Calculator already set up in @Before)
        int valueA = 10;
        int valueB = 5;

        // 2. Act: Invoke the method under test
        int result = calculator.add(valueA, valueB);

        // 3. Assert: Verify the result matches our expectations
        assertEquals(15, result);
    }

    /**
     * Test case for subtraction, structured with the AAA pattern.
     */
    @Test
    public void testSubtract() {
        // 1. Arrange: Prepare inputs
        int valueA = 10;
        int valueB = 5;

        // 2. Act: Invoke the method under test
        int result = calculator.subtract(valueA, valueB);

        // 3. Assert: Verify expectations
        assertEquals(5, result);
    }
}
