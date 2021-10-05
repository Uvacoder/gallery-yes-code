#!/bin/bash
set -e

MAP_CONFIG="scripts/mapconfig.json"

CONTENT_DIR="content"
STATIC_DIR="static"

SAVE_DIR="tmp/save"
SAVE_CONTENT_DIR="${SAVE_DIR}/content"
SAVE_STATIC_DIR="${SAVE_DIR}/static"

PAGES_TABLE_NAME="ページ"
GALLERY_TABLE_NAME="ギャラリー"

PAGES_CONTENTS_DIR="${CONTENT_DIR}/pages"
PAGES_IMAGES_DIR="${STATIC_DIR}/images/pages"
GALLERY_CONTENTS_DIR="${CONTENT_DIR}/gallery"
GALLERY_IMAGES_DIR="${STATIC_DIR}/images/gallery"

test -d "${PAGES_CONTENTS_DIR}" || mkdir -p "${PAGES_CONTENTS_DIR}"
test -d "${PAGES_IMAGES_DIR}" || mkdir -p "${PAGES_IMAGES_DIR}"
test -d "${GALLERY_CONTENTS_DIR}" || mkdir -p "${GALLERY_CONTENTS_DIR}"
test -d "${GALLERY_IMAGES_DIR}" || mkdir -p "${GALLERY_IMAGES_DIR}"


PAGES_SAVE_CONTENTS_DIR="${SAVE_CONTENT_DIR}/pages"
PAGES_SAVE_IMAGES_DIR="${SAVE_STATIC_DIR}/images/pages"
GALLERY_SAVE_CONTENTS_DIR="${SAVE_CONTENT_DIR}/gallery"
GALLERY_SAVE_IMAGES_DIR="${SAVE_STATIC_DIR}/images/gallery"

if test -d "${SAVE_DIR}" ; then
  rm -r "${SAVE_DIR}"
fi

mkdir -p "${PAGES_SAVE_CONTENTS_DIR}"
mkdir -p "${PAGES_SAVE_IMAGES_DIR}"
mkdir -p "${GALLERY_SAVE_CONTENTS_DIR}"
mkdir -p "${GALLERY_SAVE_IMAGES_DIR}"

npx sheet2content --map-config "${MAP_CONFIG}" \
  save \
  --image-info \
  --static-root "${SAVE_STATIC_DIR}" \
  "${PAGES_TABLE_NAME}" "${PAGES_SAVE_CONTENTS_DIR}" "${PAGES_SAVE_IMAGES_DIR}"
  rsync -a --delete "${PAGES_SAVE_CONTENTS_DIR}/" "${PAGES_CONTENTS_DIR}"
  rsync -a --delete "${PAGES_SAVE_IMAGES_DIR}/" "${PAGES_IMAGES_DIR}"

npx sheet2content --map-config "${MAP_CONFIG}" \
  save \
  --image-info \
  --static-root "${SAVE_STATIC_DIR}" \
  "${GALLERY_TABLE_NAME}" "${GALLERY_SAVE_CONTENTS_DIR}" "${GALLERY_SAVE_IMAGES_DIR}"
  rsync -a --delete "${GALLERY_SAVE_CONTENTS_DIR}/" "${GALLERY_CONTENTS_DIR}"
  rsync -a --delete "${GALLERY_SAVE_IMAGES_DIR}/" "${GALLERY_IMAGES_DIR}"
