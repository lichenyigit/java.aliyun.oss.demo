package aliyun.oss.demo.servlet;

import aliyun.oss.demo.listener.Listenner;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet(urlPatterns="/demo")
public class DemoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response){
		request.setAttribute("aa", "How are you?");
		Listenner.processTemplate("demo", request, response);;
	}
	
}
