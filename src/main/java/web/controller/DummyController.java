package web.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
	public ModelAndView hello(HttpSession session) {
		ModelAndView mav = new ModelAndView("johan/hello");
		mav.addObject("testvarde", dummyService.getValue());
		mav.addObject("personnummer", session.getAttribute("officialId"));
		mav.addObject("ettTill", "ett till värde");
		return mav;
	}
}
