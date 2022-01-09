package party.maker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import party.maker.abl.FileRequestAbl;
import party.maker.dto.ListFilesDtoIn;
import party.maker.dto.ListFilesDtoOut;
import party.maker.dto.RenameFileDtoIn;

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


    @RequestMapping(value = "/file/get", produces = "audio/mp3", method = POST)
    @ResponseBody
    public ResponseEntity<ByteArrayResource> getFile(@RequestBody(required = false) ListFilesDtoIn dtoIn) { //TODO create new or rename
        return fileRequestAbl.getFileFucked(dtoIn.getPath());
    }

    @RequestMapping(value = "file/rename", method = POST)
    public ListFilesDtoOut renameFile(@RequestBody(required = false) RenameFileDtoIn dtoIn) {
        return fileRequestAbl.renameFile(dtoIn.getNewName(), dtoIn.getPath());
    }

    @RequestMapping(value = "file/delete", method = POST)
    public ListFilesDtoOut deleteFile(@RequestBody(required = false) ListFilesDtoIn dtoIn) {
        return fileRequestAbl.deleteFile(dtoIn.getPath());
    }
}
