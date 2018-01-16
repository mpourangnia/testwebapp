package web.service;



import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Date;



@Component
public class DummyService
{
    public String getValue() {
        return "JavaConfig bean time: " + new Date().toString();
    }
}
