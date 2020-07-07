package br.com.lotogen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class LotogenApplication {

    public static void main(String[] args) {
        SpringApplication.run(LotogenApplication.class, args);
    }

}
