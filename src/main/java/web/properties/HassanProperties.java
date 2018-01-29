package web.properties;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.List;



@Component
public class HassanProperties {

	private static final Logger LOG = LoggerFactory.getLogger(HassanProperties.class);

	@Autowired
	private Environment environment;



	@PostConstruct
	private void init() {
		LOG.info("Initializing properties using configuration profile(s): " + getActiveProfiles());
	}



	private List<String> getActiveProfiles() {
		return Arrays.asList(environment.getActiveProfiles());
	}



	public String getDatasourceJNDIName() {
		return environment.getProperty("spring.datasource.jndi-name", "");
	}



	public String getDatasourceUrl() {
		return environment.getProperty("spring.datasource.url", "");
	}



	public String getDatasourceDriverClassName() {
		return environment.getProperty("spring.datasource.driver-class-name", "");
	}



	public String getDatasourceUsername() {
		return environment.getProperty("spring.datasource.username", "");
	}



	public String getDatasourcePassword() {
		return environment.getProperty("spring.datasource.password", "");
	}
}
