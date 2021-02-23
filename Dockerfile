FROM centos:8

# 言語設定
RUN rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial && \
    dnf -y upgrade && \
    dnf -y install glibc-locale-source && \
    dnf clean all && \
    localedef -f UTF-8 -i ja_JP ja_JP.UTF-8 && \
    ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime
ENV LANG="ja_JP UTF-8" \
    LANGUAGE="ja_JP:ja" \
    LC_ALL="ja_JP.UTF-8" \
    TZ="Asia/Tokyo"

RUN dnf -y install gcc which vim


# node js 
RUN dnf -y module reset nodejs
RUN dnf -y module enable nodejs:14
RUN dnf module -y install nodejs:14

# vie js用のインターフェースインストール
RUN npm install -g @vue/cli
