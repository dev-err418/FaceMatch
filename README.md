# Face Recognition App

![alt text](https://github.com/arthur-spa/Face-Recognition/blob/master/screen-shots/3.png)

Il vous faut Python et Nodejs installés. Pour verifier cela, entrez les commandes suivantes dans votre terminal :
```
node -v
```
```
python3 -V
```
```
pip3 -V
```
Chacune des ces commandes doit vous retourner une version. Ex : ```Python 3.8.3```. Dans le cas contraire, voici les liens officiels pour les instalations :
- [Node](https://nodejs.org/en/download/)
- [Python](https://www.python.org/downloads/) (Python et pip vont normallement ensemble).
- [Pip](https://pip.pypa.io/en/stable/installing/)

## Face-recognition

La librairie [face_recognition](https://github.com/ageitgey/face_recognition) à besoin de plusieurs paquets. Si vous avez déjà face_recognition installé passez directement la phase d'installation.
```
pip install cmake
```
Ou : https://cmake.org/download/
```
pip install dlib
```
```
pip install face_recognition
```

#### Si la dernière commande retourne une erreur d'installation (si vous n'avez que des warnings, pas besoin), suivez [ce document](https://gist.github.com/ageitgey/629d75c1baac34dfa5ca2a1928a7aeaf).

## Installer l'application

L'application est codée avec [Electron](https://github.com/electron/electron).
- Option une : redez vous [ici](https://github.com/arthur-spa/Face-Recognition) et cliquez sur le bouton vert (clone), puis sur télécharger le ZIP. Une fois téléchargé, clique droit sur le dossier puis "décompresser" ou "extraire".
- Option deux : retrez cette commande : ```git clone https://github.com/arthur-spa/Face-Recognition.git```.

Lancez un terminal et rendez vous dans le fichier dézippé. (```cd``` + le nom du dossier pour s'y rendre; ```cd ..``` pour retourner d'un dossier en arrière; ```ls``` pour lister les fichiers et dossiers présents dans le dossier dans lequel vous êtes. La touche "tab" [au dessus de shift lock] permet de compléter. Ex vous êtes dans un dossier contenant un dossier nomé "Dossier", il vous suffit de tapper ```cd D``` puis "tab" pour compléter => vous obtiendrez donc ```cd Dossier```.)

Une fois dans le dossier, executez ```npm i``` pour installer tous les paquets requis par l'application.
Et enfin la dernière commande, une fois la précédente términéé : ```npm start```. Cette command lancera l'application.

Amusez vous bien !

### Le code est libre de droit, utilisez-le, modifiez-le, comme bon vous semble. Happy coding :rocket: !

![alt text](https://github.com/arthur-spa/Face-Recognition/blob/master/screen-shots/1.png) 
![alt text](https://github.com/arthur-spa/Face-Recognition/blob/master/screen-shots/2.png) 
