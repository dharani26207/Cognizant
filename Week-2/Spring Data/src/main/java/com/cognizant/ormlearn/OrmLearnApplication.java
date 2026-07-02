package com.cognizant.ormlearn;

import java.util.List;

import com.cognizant.ormlearn.model.Country;
import com.cognizant.ormlearn.service.CountryService;
import com.cognizant.ormlearn.service.EmployeeDemoService;
import com.cognizant.ormlearn.service.exception.CountryNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class OrmLearnApplication {

    private static final Logger LOGGER = LoggerFactory.getLogger(OrmLearnApplication.class);

    private static CountryService countryService;

    private static EmployeeDemoService employeeDemoService;

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(OrmLearnApplication.class, args);
        LOGGER.info("Inside main");

        countryService = context.getBean(CountryService.class);
        employeeDemoService = context.getBean(EmployeeDemoService.class);
        testGetAllCountries();
        testFindCountryByCode();
        testAddCountry();
        testQueryMethods();
        testOrmMappings();
        testHqlAndNativeQueries();
    }

    private static void testGetAllCountries() {
        LOGGER.info("Start");
        List<Country> countries = countryService.getAllCountries();
        LOGGER.debug("countries={}", countries);
        LOGGER.info("End");
    }

    private static void testFindCountryByCode() {
        LOGGER.info("Start");
        try {
            Country country = countryService.findCountryByCode("IN");
            LOGGER.debug("Country:{}", country);
        } catch (CountryNotFoundException e) {
            LOGGER.error("Country lookup failed", e);
        }
        LOGGER.info("End");
    }

    private static void testAddCountry() {
        LOGGER.info("Start");
        try {
            Country country = new Country();
            country.setCode("XY");
            country.setName("Test Country");

            countryService.addCountry(country);

            Country addedCountry = countryService.findCountryByCode("XY");
            LOGGER.debug("Added Country:{}", addedCountry);
        } catch (CountryNotFoundException e) {
            LOGGER.error("Country lookup failed", e);
        }
        LOGGER.info("End");
    }

    private static void testQueryMethods() {
        LOGGER.info("Start");
        employeeDemoService.runQueryMethodDemo();
        LOGGER.info("End");
    }

    private static void testOrmMappings() {
        LOGGER.info("Start");
        employeeDemoService.runOrmMappingDemo();
        LOGGER.info("End");
    }

    private static void testHqlAndNativeQueries() {
        LOGGER.info("Start");
        employeeDemoService.runHqlAndNativeQueryDemo();
        LOGGER.info("End");
    }
}
