package web.config;



import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;
import web.messagesources.DatabaseMessageSource;
import web.messagesources.MessageSourceService;

import java.util.Locale;



@Configuration
public class MessageSourceConfig {

	@Bean
	public MessageSource messageSource(MessageSourceService messageSourceService) {
		return new DatabaseMessageSource(messageSourceService);
	}



	@Bean
	public LocaleResolver localeResolver() {
		SessionLocaleResolver localeResolver = new SessionLocaleResolver();
		localeResolver.setDefaultLocale(new Locale("sv", "SE"));
		return localeResolver;
	}
}
