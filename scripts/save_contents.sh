#!/bin/bash
set -e

PAGES_TABLE_NAME="ページ"
PAGES_CONTENTS_DIR="content/pages"
PAGES_IMAGES_DIR="static/images/pages"
GALLERY_TABLE_NAME="ギャラリー"
GALLERY_CONTENTS_DIR="content/gallery"
GALLERY_IMAGES_DIR="static/images/gallery"

test -d "${PAGES_CONTENTS_DIR}" && rm -r "${PAGES_CONTENTS_DIR}" || true
test -d "${PAGES_IMAGES_DIR}" && rm -r "${PAGES_IMAGES_DIR}" || true
test -d "${GALLERY_CONTENTS_DIR}" && rm -r "${GALLERY_CONTENTS_DIR}" || true
test -d "${GALLERY_IMAGES_DIR}" && rm -r "${GALLERY_IMAGES_DIR}" || true

mkdir -p "${PAGES_CONTENTS_DIR}"
mkdir -p "${PAGES_IMAGES_DIR}"
mkdir -p "${GALLERY_CONTENTS_DIR}"
mkdir -p "${GALLERY_IMAGES_DIR}"

npx sheet2content save "${PAGES_TABLE_NAME}" "${PAGES_CONTENTS_DIR}" "${PAGES_IMAGES_DIR}"
npx sheet2content save "${GALLERY_TABLE_NAME}" "${GALLERY_CONTENTS_DIR}" "${GALLERY_IMAGES_DIR}"
