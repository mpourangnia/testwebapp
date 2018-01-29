package web.messagesources;



import org.springframework.context.support.AbstractMessageSource;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;



@Service
public class DatabaseMessageSource extends AbstractMessageSource {

	private final MessageSourceService messageSourceService;

	private Map<String, Map<Locale, String>> messages = new HashMap<>();



	public DatabaseMessageSource(MessageSourceService messageSourceService) {
		this.messageSourceService = messageSourceService;
	}



	@PostConstruct
	public void init() {
		this.messages = messageSourceService.loadMessageSource();
	}



	@Override
	protected MessageFormat resolveCode(String code, Locale locale) {
		String msg = getMessage(code, locale);
		return createMessageFormat(msg, locale);
	}



	@Override
	protected String resolveCodeWithoutArguments(String code, Locale locale) {
		return getMessage(code, locale);
	}



	private String getMessage(String code, Locale locale) {
		Map<Locale, String> data = messages.get(code);
		return data != null ? data.get(locale) : null;
	}
}
