import {
  PortableText,
  type PortableTextReactComponents,
} from "@portabletext/react";
import { urlFor } from "lib/client";
import Image from "next/image";
import Link from "next/link";
import { type TypedObject } from "sanity";

interface Image {
  altText: string;
  _key: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

const customComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h1: ({ children }) => <h1 className="mb-10 text-center">{children}</h1>,
    h2: ({ children }) => <h2 className="mb-10">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-4">{children}</h3>,
    h4: ({ children }) => <h4 className="mb-4">{children}</h4>,
    h5: ({ children }) => <h5 className="mb-4">{children}</h5>,
    h6: ({ children }) => <h6 className="mb-4">{children}</h6>,
  },
  types: {
    images: ({ value }) => {
      const lengthArr = value.imgContainer.length;

      if (lengthArr === 1) {
        const { altText, asset } = value.imgContainer[0];
        return (
          <Image
            src={urlFor(asset).auto("format").url()}
            alt={altText}
            width={860}
            height={485}
            className="rounded"
          />
        );
      }

      return (
        <div
          className={"flex flex-col items-center gap-4 lg:flex-row lg:gap-5"}
        >
          {value.imgContainer.map((img: Image) => (
            <div key={img._key} className="rounded">
              <Image
                src={urlFor(img.asset).auto("format").url()}
                width={420}
                height={240}
                alt={img.altText}
              />
            </div>
          ))}
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const style = "font-medium text-blue underline hover:text-orange";
      return (
        <Link className={style} href={value.href}>
          {children}
        </Link>
      );
    },
    em: ({ children }) => (
      <em className="font-semibold text-blue">{children}</em>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="ml-4 list-disc marker:text-blue">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="ml-5 list-decimal marker:text-blue">{children}</ol>
    ),
  },
};

interface Props {
  content: TypedObject | TypedObject[];
}

export const PortableTxt = ({ content }: Props) => (
  <PortableText value={content} components={customComponents} />
);
