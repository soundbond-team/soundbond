0- désinstaller toute trace de pilote avec
   0.1- `sudo apt purge *nvidia* *cuda*`
   0.2- `sudo apt autoremove`
1- ajouter les dépots universe (par défaut sous Mint) : https://tutorialforlinux.com/2020/01/29/how-to-add-universe-repository-for-ubuntu-based-systems/
   1.1- `sudo apt install software-properties-common`
   1.2- `sudo add-apt-repository universe`
   1.3- `sudo apt update`
2- installer le pilote le plus récent depuis le gestionnaire de pilotes
   2.1- `sudo apt install nvidia-driver-525` par exemple
3- Installer nvtop https://github.com/Syllo/nvtop en ajoutant le PPA (pas avec les dépots APT)
   3.1- `sudo add-apt-repository ppa:flexiondotorg/nvtop`
   3.2- `sudo apt install nvtop`
4- `sudo reboot`
5- la commande `nvtop` devrait maintenant fonctionner
6- Installer le pilote CUDA (en suivant les étapes https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html#ubuntu ou simplement celles ici à changer selon la platerforme https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&Distribution=Ubuntu&target_version=20.04&target_type=deb_local)
ATTENTION : Il faut la version 11.8. Ici pour Ubuntu 20.04 :
`wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/cuda-ubuntu2004.pin
sudo mv cuda-ubuntu2004.pin /etc/apt/preferences.d/cuda-repository-pin-600
wget https://developer.download.nvidia.com/compute/cuda/11.8.0/local_installers/cuda-repo-ubuntu2004-11-8-local_11.8.0-520.61.05-1_amd64.deb
sudo dpkg -i cuda-repo-ubuntu2004-11-8-local_11.8.0-520.61.05-1_amd64.deb
sudo cp /var/cuda-repo-ubuntu2004-11-8-local/cuda-*-keyring.gpg /usr/share/keyrings/
sudo apt-get update
sudo apt-get -y install cuda`
7- `sudo reboot`
8- Installer CuDNN (c'est la version DEB, mais ça serait pt mieux de le faire avec APT, cf. https://docs.nvidia.com/deeplearning/cudnn/install-guide/index.html)
   8.1- `sudo apt-get install zlib1g`
   8.1- `apt-cache policy cuda` pour savoir la versions adaptée, puis
   8.2- Télécharger cuDNN à la bonne version de CUDA sur https://developer.nvidia.com/rdp/cudnn-download (jsp si osef que CUDA soit version 12 et cuDNN pour 11)
   8.3- `sudo dpkg -i cudnn-local-repo-ubuntu2004-8.7.0.84_1.0-1_amd64.deb`
   8.4- `sudo cp /var/cudnn-local-repo-*/cudnn-local-*-keyring.gpg /usr/share/keyrings/`
   8.5- `sudo apt-get update`
   8.6- `sudo apt-get install libcudnn8=8.7.0.84-1+cuda11.8`
   8.7- `sudo apt-get install libcudnn8-dev=8.7.0.84-1+cuda11.8`
   8.8- `sudo apt-get install libcudnn8-samples=8.7.0.84-1+cuda11.8`
9- installer Docker
10- Installer nvidia-docker
    10.1- `ID="ubuntu"`
    10.2- `VERSION_ID="20.04"`
    10.3- `distribution=$(echo $ID$VERSION_ID)`
    10.4- `curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
      && curl -s -L https://nvidia.github.io/libnvidia-container/$distribution/libnvidia-container.list | \
            sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
            sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
`
10.5- `sudo apt-get update`
10.6- `sudo apt-get install -y nvidia-docker2`
10.7- `sudo systemctl restart docker`
11.8- `sudo reboot`
10.8- Test : `sudo docker run --rm --gpus all nvidia/cuda:11.8.0-base-ubuntu20.04 nvidia-smi`
10.9- Devrait renvoyer :
`+-----------------------------------------------------------------------------+
| NVIDIA-SMI 450.51.06    Driver Version: 450.51.06    CUDA Version: 11.0     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|                               |                      |               MIG M. |
|===============================+======================+======================|
|   0  Tesla T4            On   | 00000000:00:1E.0 Off |                    0 |
| N/A   34C    P8     9W /  70W |      0MiB / 15109MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+

+-----------------------------------------------------------------------------+
| Processes:                                                                  |
|  GPU   GI   CI        PID   Type   Process name                  GPU Memory |
|        ID   ID                                                   Usage      |
|=============================================================================|
|  No running processes found                                                 |
+-----------------------------------------------------------------------------+`

11- Pour nettoyer les images:
11.1- `docker images`
11.2- Pour supprimer une image : `docker rmi [IMAGE ID 1] [IMAGE ID 2]`
11.3- Si une image est utilisée par un container stoppé : `docker rm [CONTAINER ID 1]...`

12- Cloner le dépot avec `git clone git@github.com:lRomul/argus-freesound.git`
13- Télécharger les données, les dézipper (zip multipart à extraire avec l'aide de https://unix.stackexchange.com/a/40565), puis les renommer comme il faut
14- Exécuter les commandes suivantes:
    14.1- //NE PAS EXECUTER POUR LE MOMENT set -e
    14.2- NAME="argus-freesound"
    14.3- DOCKER_OPTIONS="--rm -it --gpus=all --ipc=host -v $(pwd):/workdir --name=${NAME} ${NAME}"
    14.4- `git checkout 7ce37a28c80412c8acc18a1773badc7879d1c054`
    14.5- Placer le contenu de Dockerfile_1 à la place de Dockerfile dans le dépot
    14.6- # NON commiter
    14.7- `docker build -t ${NAME} .`
    14.8- Ignorer les modifs du Dockerfile avec git
    14.9- `git checkout ddbe02ae88b6bd05c1b9726d2fd30c38854be4fd`
            docker run ${DOCKER_OPTIONS} python build_kernel.py
            docker run ${DOCKER_OPTIONS} python make_folds.py
            git checkout 31156c79e470ffacc494ba846aef3bd80faf0d10
            docker run ${DOCKER_OPTIONS} python train_folds.py --experiment auxiliary_016

Et là je fais un test : si numpy refuse de s'installer au moment de `docker build -t ${NAME} .`, changer le Dockerfile pour ne pas mettre de version. Au moment du run 




Pas besoin juste pour ref :
    14.10- docker run ${DOCKER_OPTIONS} /bin/bash
    14.11- apt update && apt install nano && nano /usr/local/lib/python3.8/dist-packages/soundfile.py
    14.12- Commenter/ajouter ces lignes :
"""
    #from ctypes.util import find_library as _find_library
    from ctypes import cdll
"""
"""
    #_libname = _find_library('sndfile')
    _libname = cdll.LoadLibrary('libsndfile.so')
"""
"""
    #_snd = _ffi.dlopen(_libname)
    _snd = _ffi.dlopen("/usr/lib/libsndfile.so")
"""






