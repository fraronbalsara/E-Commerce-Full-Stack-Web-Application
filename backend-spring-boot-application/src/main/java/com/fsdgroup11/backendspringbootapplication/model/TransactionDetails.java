package com.fsdgroup11.backendspringbootapplication.model;

public class TransactionDetails {

    private String orderId;
    private String currency;
    private Integer amount;
    private Integer amount_paid;
    private Integer amount_due;

    public TransactionDetails(String orderId, String currency, Integer amount, Integer amount_paid, Integer amount_due) {
        this.orderId = orderId;
        this.currency = currency;
        this.amount = amount;
        this.amount_paid = amount_paid;
        this.amount_due = amount_due;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Integer getAmount_paid() {
        return amount_paid;
    }

    public void setAmount_paid(Integer amount_paid) {
        this.amount_paid = amount_paid;
    }

    public Integer getAmount_due() {
        return amount_due;
    }

    public void setAmount_due(Integer amount_due) {
        this.amount_due = amount_due;
    }
}
