package main

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"image/jpeg"
	"log"
	"net/http"

	"github.com/nfnt/resize"
)

type FileBuf struct {
	Buff string
}

func checkError(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func resizeHandler(w http.ResponseWriter, r *http.Request) {
	var fileB FileBuf
	log.Println("accepted request:")
	if err := json.NewDecoder(r.Body).Decode(&fileB); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
	}
	defer r.Body.Close()

	jpgB, err := base64.StdEncoding.DecodeString(fileB.Buff)
	checkError(err)

	jpgI, errJpg := jpeg.Decode(bytes.NewReader([]byte(jpgB)))
	checkError(errJpg)

	m := resize.Thumbnail(720, 360, jpgI, resize.NearestNeighbor)

	buff := bytes.NewBuffer(nil)
	err = jpeg.Encode(buff, m, nil)
	checkError(err)

	defer w.Write([]byte(base64.StdEncoding.EncodeToString(buff.Bytes())))
}

func main() {
	http.HandleFunc("/resize", resizeHandler)
	err := http.ListenAndServe(":6001", nil)
	checkError(err)
}
