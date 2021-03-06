package com.adxl.weighttracker.models;

import java.util.Calendar;
import java.util.Date;

public class WeightEntry {

  private double value;
  private Date date;

  public WeightEntry() {
  }

  public WeightEntry(double value) {
	this.value=value;
	this.date=Calendar.getInstance().getTime();
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

  public void setDate() {
	this.date=Calendar.getInstance().getTime();
  }

  @Override
  public boolean equals(Object o) {
	if(o.getClass()==getClass())
	{
	  WeightEntry e=((WeightEntry)o);
	  return (this.value==e.getValue() && this.date.compareTo(e.getDate())==0);
	}
	return false;
  }

  @Override
  public String toString() {
	return "WeightEntry{"+"'value='"+value+"','date='"+date+"'}";
  }
}
