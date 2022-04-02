package party.maker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import party.maker.dto.Champion;
import party.maker.helper.ChampionDataHelper;

import java.io.IOException;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class ChampionRequestController {
    @Autowired
    private ChampionDataHelper championDataHelper;

    @RequestMapping(value = "/champions/update", method = GET)
    public List<Champion> updateChampions() throws IOException {
        return championDataHelper.getNewData();
    }

    @RequestMapping(value = "/champions/list", method = GET)
    public List<Champion> listChampions() throws IOException {
        return championDataHelper.listChampions();
    }

}
