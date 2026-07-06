package com.cognizant.springlearn.controller;

import com.cognizant.springlearn.model.Country;
import com.cognizant.springlearn.service.CountryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CountryController {

	private static final Logger LOGGER = LoggerFactory.getLogger(CountryController.class);

	private final CountryService countryService;

	public CountryController(CountryService countryService) {
		this.countryService = countryService;
	}

	@RequestMapping("/country")
	public Country getCountryIndia() {
		LOGGER.info("START - getCountryIndia()");
		try (ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("country.xml")) {
			Country country = context.getBean("in", Country.class);
			LOGGER.info("END - getCountryIndia()");
			return country;
		}
	}

	@GetMapping({"/countries/{code}", "/country/{code}"})
	public Country getCountry(@PathVariable String code) {
		LOGGER.info("START - getCountry()");
		Country country = countryService.getCountry(code);
		LOGGER.info("END - getCountry()");
		return country;
	}
}
