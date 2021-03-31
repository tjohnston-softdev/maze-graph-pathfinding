# Image Config
When parsing image files, certain parameters can be altered such as the target floor colour and the size of the tiles. It can be very annoying and frustrating to have to type these out in the command line. That is why there is an option to save and load JSON configuration files as needed.

You can either use the `--save` option in the relevant image commands, or you can use the stand-alone command `create-image-config`

---

#### Example:
```
{
	"wall": "#000000",
	"floor": "#FFFFFF",
	"tolerance": 0.000,
	"tileSize": 10,
	"x": 0,
	"y": 0
}
```

---

#### Properties:

| Property | Description |
| --- | --- |
| wall | The hex colour of wall pixels in the target image. |
| floor | The hex colour of floor pixels in the target image. |
| tolerance | The percentage difference allowed when checking image pixel colours. |
| tileSize | The approximate size of a maze tile in pixels. |
| x | The approximate X location of the first tile. |
| y | The approximate Y location of the first tile. |


---

[Input Types List](./readme.md)