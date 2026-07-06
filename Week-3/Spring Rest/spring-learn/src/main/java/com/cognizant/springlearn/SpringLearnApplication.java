package com.cognizant.springlearn;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@SpringBootApplication
public class SpringLearnApplication {

	private static final Logger LOGGER = LoggerFactory.getLogger(SpringLearnApplication.class);

	public static void main(String[] args) throws ParseException {
		LOGGER.info("START - main()");
		displayDate();
		SpringApplication.run(SpringLearnApplication.class, args);
		LOGGER.info("END - main()");
	}

	public static void displayDate() throws ParseException {
		try (ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("date-format.xml")) {
			SimpleDateFormat format = context.getBean("dateFormat", SimpleDateFormat.class);
			Date parsedDate = format.parse("31/12/2018");
			System.out.println(parsedDate);
		}
	}
}
