package web.controller;



import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;



@Controller
public class JohansController {

	@GetMapping("/johan")
	public String johan() {
		return "johan";
	}
}
