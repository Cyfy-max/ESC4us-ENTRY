
import gql from 'graphql-tag';

export const POST_GETIR=gql`
{
getPosts{
    id,
    kullaniciAd,
    body,
    begeniSayisi,
    yorumSayisi,
    yorumlar{
      id,
      kullaniciAd,
      olusturulmaTarihi,
      body
    },
    begeniler{
      id,
      kullaniciAd,
      olusturulmaTarihi
    }
  
  }
  }

`