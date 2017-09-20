package aliyun.oss.demo.servlet;

import aliyun.oss.demo.listener.Listenner;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet(urlPatterns="/demo1")
public class Demo1Servlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response){
		Listenner.processTemplate("demo1", request, response);;
	}
	
}
