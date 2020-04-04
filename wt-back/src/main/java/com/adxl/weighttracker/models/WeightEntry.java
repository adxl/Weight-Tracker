package com.adxl.weighttracker.models;

import java.util.Date;

public class WeightEntry {

  private double value;
  private Date date;

  public WeightEntry(double value) {
	this.value=value;
	this.date=new Date();
  }

  public WeightEntry(double value,Date date) {
	this.value=value;
	this.date=date;
  }

  public double getValue() {
	return value;
  }

  public Date getDate() {
	return date;
  }
}
