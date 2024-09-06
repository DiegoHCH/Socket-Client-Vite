export interface IMessage {
  favorite:          string | boolean
  id_chat:           string
  id_sender:         string
  message:           string
  status:            string
  type:              string | number
  date?:             string
  date_enqueue?:     string
  message_id?:       string
  replying?:         string
  image_sender?:     string
  media?:            Documents | Images | Audios | any
  name_sender?:      string
  reaction?:         IReactions[]
  rnd?:              string
  type_chat?:        string
}

export interface IReactions {
  id_message:     string,
  id_chat:        string,
  id_reaction:    string,
  id_user:        string,
  reaction?:      string,
}

export interface Audios {
  ext:    string;
  name:   string;
  source: string;
  timer:  string;
}

export interface Documents {
  ext:    string;
  name:   string;
  source: string;
}

export interface Images {
  ext:    string;
  name:   string;
  source: string;
}