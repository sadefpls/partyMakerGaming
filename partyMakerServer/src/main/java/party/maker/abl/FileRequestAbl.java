package party.maker.abl;

import org.apache.commons.io.FilenameUtils;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import party.maker.dto.PartyFile;
import party.maker.dto.UploadFileDtoIn;
import party.maker.dto.pathDtoOut;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Component
public class FileRequestAbl {

    public pathDtoOut listFiles(String path) {
        File dir = path != null ? new File(path) : new File(new FileSystemResource("").getFile().getAbsolutePath());
        List<PartyFile> files = dir.listFiles() != null ? convertFiles(Objects.requireNonNull(dir.listFiles())) : new ArrayList<>();
        return new pathDtoOut(dir.getPath(), files);
    }

    private List<PartyFile> convertFiles(File[] files) {
        List<PartyFile> convertedFiles = new ArrayList<>();
        for (File file : files) {
            convertedFiles.add(new PartyFile(file.getName(), file.getPath(), file.isFile(), 0));
        }
        return convertedFiles;
    }

    public ResponseEntity<InputStreamResource> getFile(String path) throws IOException {
        ResponseEntity<InputStreamResource> respEntity = null;

        byte[] reportBytes = null;
        File result = new File(path);

        if (result.exists()) {
            InputStream inputStream = new FileInputStream(path);
            return ResponseEntity.ok().body(new InputStreamResource(inputStream));
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    public pathDtoOut renameFile(String newName, String path) {
        try {
            newName = newName.replaceAll("\"", "");
            String newFullName = getPath(path) + newName;
            File file = new File(path);
            newFullName += "." + FilenameUtils.getExtension(path);
            File newFile = new File(newFullName);
            file.renameTo(newFile);
            return listFiles(getPath(path));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private String getPath(String path) {
        String[] fracturedPath = path.split("\\\\");
        String[] folder = Arrays.copyOf(fracturedPath, fracturedPath.length - 1);
        String newFullName = String.join("\\", folder);
        return newFullName += "\\";
    }

    public pathDtoOut deleteFile(String path) {
        File file = new File(path);
        file.delete();
        return listFiles(getPath(path));
    }

    public pathDtoOut uploadFile(UploadFileDtoIn dtoIn) {
        Path filepath = Paths.get(dtoIn.getPath(), dtoIn.getFile().getOriginalFilename());

        try (OutputStream os = Files.newOutputStream(filepath)) {
            os.write(dtoIn.getFile().getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return listFiles(getPath(dtoIn.getPath()));
    }
}
