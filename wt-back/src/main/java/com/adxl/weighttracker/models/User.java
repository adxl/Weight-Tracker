package com.adxl.weighttracker.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Document(collection="users")
public class User {

  @Id
  private String username;
  @NotNull
  private String password;
  @NotNull
  private String name;

  private List<WeightEntry> entries;

  public User(String username,String password,String name) {
	this.username=username;
	this.password=password;
	this.name=String.valueOf(name.charAt(0)).toUpperCase()+(name.substring(1)).toLowerCase();
	entries=new ArrayList<>();
  }

  public String getUsername() {
	return username;
  }

  public void setPassword(String password) {
	this.password=password;
  }

  public String getPassword() {
	return password;
  }

  public String getName() {
	return name;
  }

  public List<WeightEntry> getEntries() {
	return entries;
  }

  public void addEntry(WeightEntry entry) {
	entries.add(entry);
  }

  public void deleteEntry(WeightEntry entry) {
	entries.remove(entry);
  }

  public boolean hasEntry(WeightEntry entry) {
	return entries.contains(entry);
  }

  public WeightEntry editEntry(WeightEntry entry,WeightEntry newEntry) {
	var index=entries.indexOf(entry);
	entries.set(index,newEntry);

	return entry;
  }

  public void clearEntries() {
	entries.clear();
  }

  @Override
  public String toString() {
	return "User{"+"'username:'"+username+"','entries:'"+entries.size()+"'}";
  }
}
