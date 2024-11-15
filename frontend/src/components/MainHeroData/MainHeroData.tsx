import { useState } from "react";
import { MainHeroDataProps } from "../../types/components";
import css from "./MainHeroData.module.css";
import { checkBlancFields } from "../../helpers/checkBlancFields";
import toast from "react-hot-toast";
import { deleteHero, patchHero } from "../../axios/heroes";
import { heroData } from "../../types/data";
import { isEqual } from "lodash";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export default function MainHeroData({ hero }: MainHeroDataProps) {
  const [heroData, setTextHeroData] = useState({ ...hero });
  const navigate = useNavigate();

  const changeDataHandler = (e: { name: string; value: string }) => {
    setTextHeroData((prevData) => ({
      ...prevData,
      [e.name]: e.value,
    }));
  };

  const changeSuperpowHandler = (e: {
    name: string;
    value: string;
  }) => {
    setTextHeroData((prevData) => ({
      ...prevData,
      superpowers: prevData.superpowers.map((data, i) =>
        i === Number(e.name) ? e.value : data
      ),
    }));
  };

  const handleDeletePow = (index: number) => {
    setTextHeroData((prevData) => ({
      ...prevData,
      superpowers: prevData.superpowers.filter((_, i) => i !== index),
    }));
  };

  const handleAddPow = () => {
    setTextHeroData((prevData) => ({
      ...prevData,
      superpowers: [...prevData.superpowers, "New Superpower"],
    }));
  };

  const [edit, setEdit] = useState(true);
  const editHandle = () => {
    if (checkBlancFields(heroData)) {
      toast.error("You have blank spaces!");
      return;
    }
    if (!edit) handlePatch(heroData);
    setEdit(!edit);
  };

  const handlePatch = async (data: heroData) => {
    if (!isEqual(hero, data)) {
      await patchHero(data);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteHero(id);

    setTimeout(() => {
      navigate("/heroes", { replace: true });
    }, 500);
  };

  return (
    <div className={css.container}>
      <button
        className={css.editButton}
        type="button"
        onClick={editHandle}
      >
        {edit ? "Edit" : "Save"}
      </button>
      {!edit && (
        <button
          className={css.deleteHeroButton}
          onClick={() => handleDelete(hero._id)}
          type="button"
        >
          Delete Hero!
        </button>
      )}

      {hero.images.length === 0 ? (
        <div className={css.noImageContainer}>No Image!</div>
      ) : (
        <img
          className={css.image}
          src={`${hero.images[0]}`}
          alt={hero.nickname}
        />
      )}
      <div className={css.textData}>
        <input
          className={clsx(css.heroName, !edit && css.active)}
          type="text"
          value={heroData.nickname}
          disabled={edit}
          name="nickname"
          onChange={(e) => changeDataHandler(e.target)}
          autoComplete="off"
        />
        <input
          className={clsx(css.text, !edit && css.active)}
          type="text"
          value={heroData.real_name}
          disabled={edit}
          name="real_name"
          onChange={(e) => changeDataHandler(e.target)}
          autoComplete="off"
        />
        <input
          className={clsx(css.text, !edit && css.active)}
          type="text"
          value={heroData.catch_phrase}
          disabled={edit}
          name="catch_phrase"
          onChange={(e) => changeDataHandler(e.target)}
          autoComplete="off"
        />
        <textarea
          className={clsx(css.text, !edit && css.active)}
          value={heroData.origin_description}
          disabled={edit}
          name="origin_description"
          onChange={(e) => changeDataHandler(e.target)}
          autoComplete="off"
        />
        <ul className={css.itemList}>
          {heroData.superpowers.map((item, index) => {
            return (
              <li
                className={clsx(css.item, !edit && css.active)}
                key={index}
              >
                <input
                  className={css.superpowerInput}
                  type="text"
                  value={item}
                  disabled={edit}
                  name={`${index}`}
                  size={item.length - 1}
                  autoComplete="off"
                  onChange={(e) => changeSuperpowHandler(e.target)}
                />

                {!edit && (
                  <button
                    className={css.delButton}
                    onClick={() => handleDeletePow(index)}
                  >
                    X
                  </button>
                )}
              </li>
            );
          })}
          {!edit && (
            <button
              className={css.addPowButton}
              onClick={() => handleAddPow()}
            >
              Add Power
            </button>
          )}
        </ul>
      </div>
    </div>
  );
}
