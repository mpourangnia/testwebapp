package web.service;



import org.springframework.stereotype.Component;

import java.time.LocalDateTime;



@Component
public class DummyService
{
    public String getValue() {
        return "JavaConfig bean time: " + LocalDateTime.now().toString();
    }
}
