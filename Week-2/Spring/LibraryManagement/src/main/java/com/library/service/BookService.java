package com.library.service;

import com.library.repository.BookRepository;

public class BookService {

    private BookRepository constructorInjectedRepository;
    private BookRepository bookRepository;

    public BookService(BookRepository constructorInjectedRepository) {
        this.constructorInjectedRepository = constructorInjectedRepository;
    }

    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public void displayBooks() {
        System.out.println("Books from setter-injected repository:");
        for (String book : bookRepository.findAllBooks()) {
            System.out.println("- " + book);
        }

        System.out.println("Constructor injection verified: "
                + (constructorInjectedRepository != null));
    }
}
