package web.messagesources;



import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;



@Repository
public class MessageSourceDAO {

	private final NamedParameterJdbcTemplate jdbcTemplate;

	private Map<String, Locale> locales = new HashMap<>();



	public MessageSourceDAO(DataSource dataSource) {
		this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
	}



	public Map<String, Map<Locale, String>> loadMessageSource() {
		String sql = "SELECT [key], locale, val FROM FSKDB.MESSAGE_RESOURCES";
		return jdbcTemplate.query(sql, this::extractData);
	}



	private Map<String, Map<Locale, String>> extractData(ResultSet rs) throws SQLException {
		Map<String, Map<Locale, String>> messages = new HashMap<>();
		while (rs.next()) {
			Locale locale = getLocale(rs.getString("locale"));
			addMessage(rs.getString("key"), locale, rs.getString("val"), messages);
		}
		return messages;
	}



	private Locale getLocale(String key) {
		String realKey = key == null ? "sv_SE" : key;

		if (locales.containsKey(realKey)) {
			return locales.get(realKey);
		}

		String[] langCountry = realKey.split("_");
		Locale locale = new Locale(langCountry[0], langCountry[1]);
		locales.put(realKey, locale);

		return locale;
	}



	private void addMessage(String code, Locale locale, String msg, Map<String, Map<Locale, String>> messages) {
		Map<Locale, String> data = messages.computeIfAbsent(code, k -> new HashMap<>());
		data.put(locale, msg);
	}
}
