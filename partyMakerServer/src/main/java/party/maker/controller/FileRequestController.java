package party.maker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import party.maker.abl.FileRequestAbl;
import party.maker.dto.ListFilesDtoOut;
import party.maker.dto.PartyFile;
import party.maker.dto.ListFilesDtoIn;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class FileRequestController {
    @Autowired
    private FileRequestAbl fileRequestAbl;

    @RequestMapping(value = "/files/list", method = POST)
    public ListFilesDtoOut listFiles(@RequestBody(required = false) ListFilesDtoIn path) {
        return path != null ? fileRequestAbl.listFiles(path.getPath()) : fileRequestAbl.listFiles(null);
    }
}
