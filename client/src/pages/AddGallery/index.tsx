import { useRef, useState, type ChangeEvent, type FC } from "react";
import HeaderInputPage from "../../components/HeaderInputPage";
import { Controller, useForm, type UseFormSetValue } from "react-hook-form";
import type { GalleryCreateRequestType } from "../../models/gallery-model";
import { zodResolver } from "@hookform/resolvers/zod";
import { GalleryValidation } from "../../validations/gallery-validation";
import { useMutation } from "@tanstack/react-query";
import { GalleryService } from "../../services/gallery.service";
import { TbTrashFilled } from "react-icons/tb";
import ButtonSubmitBox from "../../components/ButtonSubmitBox";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";

const AddGallery: FC = () => {
  // get use params
  const { id: idHotel } = useParams<{ id: string }>();

  // navigate
  const navigate = useNavigate();
  // use form
  const { watch, setValue, handleSubmit, control, reset } =
    useForm<GalleryCreateRequestType>({
      defaultValues: {
        idHotel: idHotel ?? "",
      },
      resolver: zodResolver(GalleryValidation.CREATE),
    });

  // watch files
  const files: File[] = watch("images") || [];

  // use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (formData: FormData) => GalleryService.create(formData),
    onSuccess: (data) => {
      // reset
      reset();

      console.log(data);
      // navigate
      navigate(`/dashboard/hotel/detail/${idHotel}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // on submit
  const onSubmit = async (data: GalleryCreateRequestType) => {
    try {
      // form data
      const formData = new FormData();

      // data files
      data.images.forEach((file) => formData.append("images", file));

      //   id hotel
      // append idHotel
      formData.append("idHotel", data.idHotel);

      // mutate
      return await mutateAsync(formData);
    } catch (error) {
      console.log(error);
    }
  };

  // use mutation
  return (
    <div className="w-full flex flex-col justify-start items-start gap-6 pt-6 px-4 relative">
      {/* header */}
      <HeaderInputPage label="Add Gallery" />

      {/* form input */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-start items-center gap-2"
      >
        {/* input gallery */}
        <Controller
          name="images"
          control={control}
          render={({ fieldState }) => (
            <ComponentInputGallery
              setValue={setValue}
              filesOld={files}
              error={fieldState.error?.message}
            />
          )}
        />

        {/* button submit */}
        <div className="w-full mt-8">
          <ButtonSubmitBox label="submit" type="submit" loading={isPending} />
        </div>
      </form>
    </div>
  );
};

// componet input gallery
type ComponentInputGalleryProps = {
  setValue: UseFormSetValue<GalleryCreateRequestType>;
  filesOld: File[];
  error?: string;
};
const ComponentInputGallery: FC<ComponentInputGalleryProps> = ({
  setValue,
  filesOld,
  error,
}) => {
  // state preview
  const [preview, setPreview] = useState<string[]>([]);

  // handle set preview & set value
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // get files
    const files = e.target.files;

    // cek files
    if (files) {
      setValue("images", [...filesOld, ...Array.from(files)], {
        shouldValidate: true,
      });

      // set preview
      setPreview((prev) => [
        ...prev,
        ...Array.from(files).map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  //   handle remove
  const handleRemove = (index: number) => {
    // set value
    const newFiles = filesOld.filter((_, i) => i !== index);
    setValue("images", newFiles, { shouldValidate: true });

    // set preview
    setPreview(preview.filter((_, i) => i !== index));
  };

  // ref input
  const refInput = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full flex flex-col justify-start items-center gap-8">
      {/* input */}
      <div className="w-full flex flex-row justify-between items-start">
        <div className="flex-2 flex flex-col justify-start items-start gap-1">
          {/* label */}
          <label
            htmlFor="images"
            className="text-black text-base capitalize relative"
          >
            Images
            <span className="text-sm text-red-500 absolute top-0 -right-2.5">
              *
            </span>
          </label>

          {/* keterangan */}
          <p className="text-sm text-black">
            (max size : 2 mb, file accept: jpeg, jpg, png, wepb)
          </p>

          {/* error */}
          <div className="h-4">
            <p
              className={clsx(
                "text-xs text-red-500 transition-opacity duration-200 ease-in-out",
                error ? "opacity-100" : "opacity-0"
              )}
            >
              {error}
            </p>
          </div>
        </div>

        {/* input */}
        <input
          type="file"
          multiple
          ref={refInput}
          accept=".png,.jpg,.jpeg,.wepb,image/png,image/jpeg,image/wepb"
          hidden={true}
          onChange={handleChange}
        />

        {/* button add */}
        <div className="flex-1 flex flex-row justify-end items-center">
          <button
            type="button"
            onClick={() => refInput?.current?.click()}
            className="py-2 px-4 bg-green-500/20 border border-green-500 rounded-lg text-green-500 text-xs font-semibold hover:bg-green-500 hover:text-white transition-colors duration-300 ease-in-out"
          >
            add
          </button>
        </div>
      </div>

      {/* preview */}
      <div className="w-full flex flex-col justify-start items-center gap-2">
        {/* header preview */}
        <h1 className="w-full text-left text-base font-medium">Preview</h1>
        {/* card preview */}
        {preview.length > 0 ? (
          preview.map((item, index) => (
            <CardPreview
              key={index}
              img={item}
              handleRemove={() => handleRemove(index)}
            />
          ))
        ) : (
          <p className="text-sm">Tidak ada preview</p>
        )}
      </div>
    </div>
  );
};

// card preview
type CardPreviewProps = {
  img: string;
  handleRemove: () => void;
};

const CardPreview: FC<CardPreviewProps> = ({ img, handleRemove }) => {
  return (
    <div className="w-full h-52 bg-gray-300 rounded-xl overflow-hidden relative">
      {/* img */}
      <img src={img} alt="hotel" className="w-full h-full object-center" />

      {/* remove */}
      <button
        onClick={handleRemove}
        type="button"
        className="w-11 h-11 bg-red-500/80 rounded-full absolute z-10 bottom-4 right-4 flex flex-row justify-center items-center transition-all duration-200 ease-in-out hover:bg-red-500"
      >
        <TbTrashFilled className="text-white text-2xl" />
      </button>
    </div>
  );
};

export default AddGallery;
