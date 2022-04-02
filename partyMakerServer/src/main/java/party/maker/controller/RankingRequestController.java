package party.maker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import party.maker.abl.RankingRequestAbl;
import party.maker.dto.RankingItem;
import party.maker.dto.SetRankingItemDtoIn;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class RankingRequestController {

    @Autowired
    private RankingRequestAbl rankingRequestAbl;

    @RequestMapping(value = "/ranking/list", method = GET)
    public List<RankingItem> listFiles() {
        return rankingRequestAbl.listRanking();
    }

    @RequestMapping(value = "/item/set", method = POST)
    public void setRankingItem(@RequestBody(required = false) SetRankingItemDtoIn dtoIn) {
        rankingRequestAbl.setRankingItem(dtoIn);
    }
}
