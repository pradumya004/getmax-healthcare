// src/lib/utils/textConverter.js

import { slug } from "github-slugger";
import { marked } from "marked";
import React from "react";

// Convert text to URL-friendly slug
export const slugify = (content) => {
  if (!content) return null;
  return slug(content);
};

// Convert markdown content to JSX with optional tag and className
export const markdownify = (content, tag = "span", className = "") => {
  if (!content) return null;
  const Tag = tag;

  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{
        __html:
          tag === "div" ? marked.parse(content) : marked.parseInline(content),
      }}
    />
  );
};

// Convert snake_case or kebab-case to Human Readable
export const humanize = (content) => {
  if (!content) return null;

  return content
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/^[a-z]/, (m) => m.toUpperCase());
};

// Strip markdown and HTML to get plain text
export const plainify = (content) => {
  if (!content) return null;

  const mdParsed = marked.parseInline(String(content));
  const removeTags = mdParsed.replace(/<\/?[^>]+(>|$)/gm, "");
  const removeExtraLines = removeTags.replace(/[\r\n]\s*[\r\n]/gm, "");
  return htmlEntityDecoder(removeExtraLines);
};

// Decode basic HTML entities
const htmlEntityDecoder = (htmlWithEntities) => {
  const entityList = {
    "&nbsp;": " ",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
  };
  return htmlWithEntities.replace(
    /(&nbsp;|&lt;|&gt;|&amp;|&quot;|&#39;)/g,
    (entity) => entityList[entity] || entity
  );
};
