package com.example;

import org.junit.Test;
import static org.junit.Assert.*;

/**
 * Exercise 3: Assertions in JUnit.
 * Demonstrates the use of different JUnit assertion methods to validate test results.
 */
public class AssertionsTest {

    @Test
    public void testAssertions() {
        // Assert equals - verifies that the expected value matches the actual value
        assertEquals(5, 2 + 3);

        // Assert true - verifies that a condition is true
        assertTrue(5 > 3);

        // Assert false - verifies that a condition is false
        assertFalse(5 < 3);

        // Assert null - verifies that an object is null
        assertNull(null);

        // Assert not null - verifies that an object is not null
        assertNotNull(new Object());
    }
}
