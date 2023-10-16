import React, { useEffect, useState } from "react";
import Images from "./Images.js";
import { total, partItems, getAllPart } from "./Items.js";
import NavLinks from "./NavLinks.js";

function Game() {
  const [activeLink, setActiveLink] = useState("");
  const [buttons, setButtons] = useState([]);
  const [imageParts, setImageParts] = useState([]);
  const [showPart, setShowPart] = useState("");
  const [showingParts, setShowingParts] = useState([]);

  useEffect(() => {
    getAllPart();
    randomize();
    showPartListsDefault("Body");
  }, []);

  function randomize() {
    const randomPart = (partName, totalSize, zIndex) => {
      const index = Math.floor(Math.random() * totalSize) + 1;
      return {
        classify: partName,
        key: `${partName}_${index}`,
        link: `character/${partName}/${index}.png`,
        zIndex: zIndex.toString(),
      };
    };
    setShowingParts([]);
    const noses = 1;
    const body = randomPart("body", total.Body, 0);
    const eyes = randomPart("eyes", total.Eyes, 4);
    const mouth = randomPart("mouths", total.Mouths, 4);
    const eyebrows = randomPart("eyebrows", total.Eyebrows, 4);
    const clothes = randomPart("layer_1", total.Layer_1, 2);
    const hair = randomPart("hair", total.Hair, 6);
  
    const parts = [body, eyes, { classify: "noses", key: `noses_${noses}`, link: `character/noses/${noses}.png`, zIndex: "4" }, mouth, eyebrows, hair, clothes];
  
    setShowingParts(parts);
    console.log(parts)
  }

  function reset() {
    setShowingParts([
      {
        classify: "Body",
        key: "Body_3",
        link: "character/body/3.png",
        zIndex: "0",
      }
    ]);
  }

  function handleNavClick(link) {
    setActiveLink(link);
    let newButtons = [];
    if (link === "Face") {
      newButtons = ["Mouths", "Noses", "Eyes", "Facial_hair", "Eyebrows"];
      showPartListsDefault("Face");
    } else if (link === "Hairs") {
      newButtons = ["Hair_1", "Hair_2", "Hair_3", "Hair_4"];
      showPartListsDefault("Hairs");
    } else if (link === "Clothes") {
      newButtons = ["Layer_1", "Layer_2", "Layer_3"];
      showPartListsDefault("Clothes");
    } else if (link === "Accessories") {
      newButtons = [
        "Earrings_1",
        "Earrings_2",
        "Glasses",
        "Hats_1",
        "Hats_2",
        "Neckwear",
      ];
      showPartListsDefault("Accessories");
    } else if (link === "Body") {
      newButtons = ["Body"];
      showPartListsDefault("Body");
    }
    setButtons(newButtons);
  }

  function showPartListsDefault(button) {
    setShowPart(button);
    setImageParts([]);
    const newImageParts = [];
    let start = 0;
    let size = 0;
    let partName = `${button}_`;
    switch (button) {
      case "Body":
        size = 17;
        break;
      case "Hairs":
        size = 20;
        partName = "Hair_";
        break;
      case "Clothes":
        size = 5;
        partName = "Layer_1_";
        break;
      case "Accessories":
        size = 17;
        partName = "Glasses_";
        break;
      case "Face":
        size = 24;
        partName = "Mouths_";
        break;
      default:
        break;
    }
    for (let index = start; index < size + start - 1; index++) {
      let key = `${partName}${index + 1}`;
      let link = "";
      partItems.forEach((obj) => {
        if (obj.key === key) {
          link = obj.link;
        }
      });
      let part = { key, link };
      newImageParts.push(part);
    }
    
    setImageParts(newImageParts);
  }

  function handlePartList(button) {
    setShowPart(button);
    setImageParts([]);
    const newImageParts = [];
    let start = 0;
    let size = 0;
    let partName = `${button}_`;
    if (activeLink === "Body" && button === "Body") {
      size = 17;
    } else if (activeLink === "Hairs") {
      size = 20;
      partName = "Hair_";
      if (button === "Hair_1") {
        start = 0;
      } else if (button === "Hair_2") {
        start = 20;
      } else if (button === "Hair_3") {
        start = 40;
      } else if (button === "Hair_4") {
        start = 60;
        size = 14;
      }
    } else if (activeLink === "Clothes") {
      size = button === "layer_3" ? 9 : 5;
    } else if (activeLink === "Accessories") {
      if (button === "Earrings_1" || button === "Earrings_2") {
        partName = "Earrings_";
        size = 16;
        start = button === "Earrings_1" ? 0 : 16;
      } else if (button === "Glasses") {
        size = 17;
      } else if (button === "Hats_1" || button === "Hats_2") {
        partName = "Hat_";
        size = 14;
        start = button === "Hats_1" ? 0 : 14;
      } else if (button === "Neckwear") {
        size = 18;
      }
    } else if (activeLink === "Face") {
      if (button === "Mouths") {
        size = 24;
      } else if (button === "Noses") {
        size = 1;
      } else if (button === "Eyes") {
        size = 24;
      } else if (button === "Facial_hair") {
        size = 17;
      } else if (button === "Eyebrows") {
        size = 15;
      }
    }
    for (let index = start; index < size + start; index++) {
      let key = `${partName}${index + 1}`;
      let link = "";
      partItems.forEach((obj) => {
        if (obj.key === key) {
          link = obj.link;
        }
      });
      let part = { key, link };
      newImageParts.push(part);
    }
    setImageParts(newImageParts);
    console.log(newImageParts)
  }

  function applyToAvatar(key) {
    partItems.forEach((obj) => {
      if (obj.key === key) {
        let link = obj.link;
        let zIndex = obj.z_index;
        let classify = obj.classify;

        let part = { classify, key, link, zIndex };

        // remove duplicate
        const updatedState = showingParts.filter(
          (item) => item.classify !== classify
        );
        setShowingParts(updatedState);
        setShowingParts((states) => [...states, part]);
        return true;
      }
    });
  }

  return (
    <div className="App">
      <div className="nav-link">
        <ul>
          <NavLinks
            activeLink={activeLink}
            link="Body"
            handleNavClick={handleNavClick}
          />
          <NavLinks
            activeLink={activeLink}
            link="Face"
            handleNavClick={handleNavClick}
          />
          <NavLinks
            activeLink={activeLink}
            link="Hairs"
            handleNavClick={handleNavClick}
          />
          <NavLinks
            activeLink={activeLink}
            link="Clothes"
            handleNavClick={handleNavClick}
          />
          <NavLinks
            activeLink={activeLink}
            link="Accessories"
            handleNavClick={handleNavClick}
          />
        </ul>
      </div>
      <div className="avatar-group">
        <div className="showing-avatar">
          <div className="avatar-wrapper">
            <div className="avatar">
              {showingParts.map((item) => (
                <img
                  src={item.link}
                  alt=""
                  width={270}
                  style={{
                    zIndex: `${item.zIndex}`,
                    position: "absolute",
                    left: 0,
                    top: 0,
                  }}
                />
              ))}
            </div>
            <div className="text-avatar">
              <button
                className="button"
                onClick={() => {
                  randomize();
                }}
              >
                Randomize!
              </button>
              <button
                className="button"
                onClick={() => {
                  reset();
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        <div className="showing-categories">
          <div className="display-categories">
            <h2>{showPart}</h2>
            <div id="list">
              {imageParts.map((partList) => (
                <div
                  key={partList.key}
                  className="clickable item "
                  onClick={() => {
                    applyToAvatar(partList.key);
                  }}
                >
                  <Images key={partList.key} image={partList.link} />
                </div>
              ))}
            </div>
            <div className="categories">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  className="categories-btn"
                  onClick={(e) => handlePartList(button)}
                >
                  {button}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
