package web.messagesources;



import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.Map;



@Service
public class MessageSourceService {

	private final MessageSourceDAO messageSourceDao;



	public MessageSourceService(MessageSourceDAO messageSourceDao) {
		this.messageSourceDao = messageSourceDao;
	}



	public Map<String, Map<Locale, String>> loadMessageSource() {
		return messageSourceDao.loadMessageSource();
	}
}
