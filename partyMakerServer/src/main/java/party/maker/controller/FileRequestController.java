package party.maker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import party.maker.abl.FileRequestAbl;
import party.maker.dto.ListFilesDtoIn;
import party.maker.dto.ListFilesDtoOut;

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
    @RequestMapping(value = "/file/get", method = POST)
    public byte[] getFile(@RequestBody(required = false) ListFilesDtoIn dtoIn) { //TODO create new or rename
        return fileRequestAbl.getFileFucked(dtoIn.getPath());
    }
}
