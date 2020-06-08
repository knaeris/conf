package com.naeris.conference.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import com.naeris.conference.exceptions.InvalidLocationException;

import java.util.Arrays;

public enum Location {

    MS_BALTIC_QUEEN("M/S Baltic Queen"),
    MEGASTAR("Megastar"),
    STAR("Star");

    private String value;

    Location(String value) {
        this.value = value;
    }

    @JsonCreator
    public static Location fromText(String text) {
        return Arrays.stream(Location.values()).filter(location -> location.value.equals(text)).findFirst().orElseThrow(InvalidLocationException::new);
    }

    @Override
    public String toString() {
        return value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
