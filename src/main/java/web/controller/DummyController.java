package web.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import web.service.DummyService;

import javax.servlet.http.HttpSession;



@Controller
public class DummyController {

	private final DummyService dummyService;



	@Autowired
	public DummyController(DummyService dummyService) {
		this.dummyService = dummyService;
	}



	@RequestMapping(value = "/hello", method = RequestMethod.GET)
	public String hello(HttpSession session, Model mav) {
		session.setAttribute("officialId", "19121212-1212");

		mav.addAttribute("testvarde", dummyService.getValue());
		mav.addAttribute("personnummer", session.getAttribute("officialId"));
		mav.addAttribute("ettTill", "ett till värde");
		return "hello";
	}
}
