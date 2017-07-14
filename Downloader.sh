#THANKS TO https://github.com/ceesvanegmond

echo "SCRIPT BY ANIMEBRO1"
FOLDER="/Users/XXX/Sites/anime" #Change this

if [ ! -d ${FOLDER} ]; then
  mkdir -p ${FOLDER};
fi

if [ ! -f ${FOLDER}/list.txt ]; then
    echo "Please copy the list.txt to this folder"
    exit
fi

while read p; do
  NAME=${p##*[}
  URL=${p%[*}

  curl -o ${FOLDER}/${NAME} {$URL}
done <${FOLDER}/list.txt
