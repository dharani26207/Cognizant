package com.example;

/**
 * A simple Calculator class used as the System Under Test (SUT)
 * to demonstrate unit testing using the Arrange-Act-Assert (AAA) pattern.
 */
public class Calculator {

    /**
     * Adds two integers.
     *
     * @param a the first integer
     * @param b the second integer
     * @return the sum of a and b
     */
    public int add(int a, int b) {
        return a + b;
    }

    /**
     * Subtracts the second integer from the first.
     *
     * @param a the first integer
     * @param b the second integer to subtract
     * @return the difference of a and b
     */
    public int subtract(int a, int b) {
        return a - b;
    }
}
