package com.adxl.weighttracker.jwt.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.adxl.weighttracker.jwt.service.JwtUserDetailsService;

import io.jsonwebtoken.ExpiredJwtException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

	private final JwtUserDetailsService jwtUserDetailsService;
	private final JwtTokenUtil jwtTokenUtil;

	public JwtRequestFilter(JwtUserDetailsService jwtUserDetailsService,JwtTokenUtil jwtTokenUtil) {
		this.jwtUserDetailsService=jwtUserDetailsService;
		this.jwtTokenUtil=jwtTokenUtil;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request,HttpServletResponse response,FilterChain chain) throws ServletException, IOException {

		final String requestTokenHeader=request.getHeader("Authorization");

		String username=null;
		String jwtToken=null;

		if(requestTokenHeader!=null)
		{
			jwtToken=requestTokenHeader;
			try
			{
				username=jwtTokenUtil.getUsernameFromToken(jwtToken);
			} catch(IllegalArgumentException e)
			{
				System.out.println("Unable to get JWT Token");
			} catch(ExpiredJwtException e)
			{
				System.out.println("JWT Token has expired");
			}
		} else
		{
			logger.warn("JWT Token is null");
		}

		// validation
		if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null)
		{
			UserDetails userDetails=this.jwtUserDetailsService.loadUserByUsername(username);

			if(jwtTokenUtil.validateToken(jwtToken,userDetails))
			{
				UsernamePasswordAuthenticationToken usrPwdAuthToken;
				usrPwdAuthToken=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
				usrPwdAuthToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(usrPwdAuthToken);
			}
		}
		chain.doFilter(request,response);
	}
}
