package com.naeris.conference;

import com.naeris.conference.model.ConferenceRoom;
import com.naeris.conference.model.Location;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class ConferenceTest {

    @Test
    public void CanCreateNewConference() {
        ConferenceRoom result = given()
                .contentType(ContentType.JSON)
                .body("{\n" +
                        "\t\"name\": \"conferencename\",\n" +
                        "\t\"location\" : \"Megastar\",\n" +
                        "\t\"maxSeats\": 10\n" +
                        "}")
                .when()
                .post("/conferencerooms")
                .then()
                .assertThat()
                .statusCode(200)
                .and()
                .contentType(ContentType.JSON)
                .extract()
                .as(ConferenceRoom.class);
        assertThat(result.getId() != null);
        assertThat("joma".equals(result.getName()));
        assertThat(Location.MEGASTAR.equals(result.getLocation()));
        assertThat(result.getMaxSeats().equals(10));
    }

    @Test
    public void canCreateNewConferenceAndCancelIt() {
        ConferenceRoom newConference = given()
                .contentType(ContentType.JSON)
                .body("{\n" +
                        "\t\"name\": \"forcancel\",\n" +
                        "\t\"location\" : \"Megastar\",\n" +
                        "\t\"maxSeats\": 10\n" +
                        "}")
                .when()
                .post("/conferencerooms")
                .then()
                .assertThat()
                .statusCode(200)
                .and()
                .contentType(ContentType.JSON)
                .extract()
                .as(ConferenceRoom.class);

        given()
                .when()
                .get("confere");
    }
}
