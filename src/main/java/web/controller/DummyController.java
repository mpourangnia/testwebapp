package web.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
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
		return "hello.html";
	}



//	@RequestMapping(value = "/hello", method = RequestMethod.GET)
//	public ModelAndView hello2(HttpSession session) {
//		session.setAttribute("officialId", "19121212-1212");
//
//		ModelAndView mav = new ModelAndView("hello.html");
//		mav.addObject("testvarde", dummyService.getValue());
//		mav.addObject("personnummer", session.getAttribute("officialId"));
//		mav.addObject("ettTill", "ett till värde");
//		return mav;
//	}
}
