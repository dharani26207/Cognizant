package com.cognizant.springlearn.service;

import java.util.List;

import com.cognizant.springlearn.model.Country;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

@Service
public class CountryService {

	public Country getCountry(String code) {
		try (ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("country.xml")) {
			List<?> countries = context.getBean("countryList", List.class);
			return countries.stream()
					.filter(Country.class::isInstance)
					.map(Country.class::cast)
					.filter(country -> country.getCode().equalsIgnoreCase(code))
					.findFirst()
					.orElse(null);
		}
	}
}
