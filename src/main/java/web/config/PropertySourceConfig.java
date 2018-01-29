package web.config;



import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;



@Configuration
@ComponentScan(basePackageClasses = {
		web.properties.HassanProperties.class,
})
public class PropertySourceConfig {

	// Configuration override order matters!
	@Configuration
	@Profile("DEV")
	@PropertySource(value = "classpath:profiles/application-DEV.properties", ignoreResourceNotFound = true)
	static class DevConfigOverrides {
	}



	@Configuration
	@Profile("CT1")
	@PropertySource(value = "classpath:profiles/application-CT1.properties", ignoreResourceNotFound = false)
	static class Ct1ConfigOverrides {
	}



	@Configuration
	@Profile("CT2")
	@PropertySource(value = "classpath:profiles/application-CT2.properties", ignoreResourceNotFound = false)
	static class Ct2ConfigOverrides {
	}



	@Configuration
	@Profile("CT3")
	@PropertySource(value = "classpath:profiles/application-CT3.properties", ignoreResourceNotFound = false)
	static class Ct3ConfigOverrides {
	}



	@Configuration
	@Profile("CT4")
	@PropertySource(value = "classpath:profiles/application-CT4.properties", ignoreResourceNotFound = false)
	static class Ct4ConfigOverrides {
	}



	@Configuration
	@Profile("CT5")
	@PropertySource(value = "classpath:profiles/application-CT5.properties", ignoreResourceNotFound = false)
	static class Ct5ConfigOverrides {
	}



	@Configuration
	@Profile("PROD")
	@PropertySource(value = "classpath:profiles/application-PROD.properties", ignoreResourceNotFound = false)
	static class ProdConfigOverrides {
	}



	@Configuration
	@PropertySource(value = "classpath:profiles/application-default.properties", ignoreResourceNotFound = true)
	static class DefaultConfig {
	}
}
